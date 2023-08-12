"use client";
import { Panel } from "@/components/atoms/Panel";
import { SubmitHandler, useForm } from "react-hook-form";
import { TaskSchema, TaskSchemaType } from "./Schema";
import { Button } from "@/components/atoms/Button";
import { Form } from "@/components/molecules/Form";
import { FormItem } from "@/components/molecules/Form/item";
import { FormLabel } from "@/components/molecules/Form/label";
import { FormTextInput } from "@/components/molecules/Form/textinput";
import { FormTextArea } from "@/components/molecules/Form/textarea";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export function TaskForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<TaskSchemaType>({
    mode: "all",
    resolver: valibotResolver(TaskSchema),
    defaultValues: {
      name: "",
      memo: "",
    },
  });
  const onSubmit: SubmitHandler<TaskSchemaType> = (data) => console.log(data);

  return (
    <Panel>
      <Form onSubmit={handleSubmit(onSubmit)} className="">
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
            name="送信"
            onClick={() => {
              console.log(getValues());
            }}
            icon={<PaperAirplaneIcon className="h-4 w-4" />}
          />
        </div>
      </Form>
    </Panel>
  );
}
