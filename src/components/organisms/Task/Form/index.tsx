"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/atoms/Button";
import { Panel } from "@/components/atoms/Panel";
import { Form } from "@/components/molecules/Form";
import { FormItem } from "@/components/molecules/Form/item";
import { FormLabel } from "@/components/molecules/Form/label";
import { FormTextArea } from "@/components/molecules/Form/textarea";
import { FormTextInput } from "@/components/molecules/Form/textinput";
import { TaskSchema, TaskSchemaType } from "./Schema";

export function TaskForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    getValues,
  } = useForm<TaskSchemaType>({
    mode: "all",
    resolver: valibotResolver(TaskSchema),
    defaultValues: {
      name: "",
      memo: "",
    },
  });
  const submitAction = async () => {
    const data = getValues();
    const task = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (task) {
      router.push("/tasks");
    }
  };

  const onSubmit: SubmitHandler<TaskSchemaType> = async (data) => {
    await submitAction();
  };
  const onClick = async () => {
    await submitAction();
  };

  return (
    <Panel>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <FormLabel htmlFor="name">タスク名</FormLabel>
          <FormTextInput
            error={errors.name}
            id="name"
            {...register("name", { required: true })}
          />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="finishedAt">終了日時</FormLabel>
          <FormTextInput
            id="finishedAt"
            type="datetime-local"
            {...register("finishedAt")}
          />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="deadline">締切</FormLabel>
          <FormTextInput
            id="deadline"
            type="datetime-local"
            {...register("deadline")}
          />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="memo">メモ</FormLabel>
          <FormTextArea id="memo" {...register("memo")} />
        </FormItem>

        <div className="flex justify-center items-center m-8 mb-0">
          <Button
            type="submit"
            name="送信"
            onClick={async () => {
              await onClick();
            }}
            disabled={!isDirty}
            icon={<PaperAirplaneIcon className="h-4 w-4" />}
          />
        </div>
      </Form>
    </Panel>
  );
}
