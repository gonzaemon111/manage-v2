import {
  Output,
  StringSchema,
  maxLength,
  minLength,
  object,
  string,
} from "valibot";

const nameSchema: StringSchema<string> = string([
  minLength(1, "タスク名を入力してください"),
  maxLength(255, "入力可能な文字数は255文字です"),
]);

const memoSchema: StringSchema<string> = string([
  maxLength(65535, "入力可能な文字数は65535文字です"),
]);

const deadlineSchema: StringSchema<string> = string();
const finishedAtSchema: StringSchema<string> = string();

export const TaskSchema = object({
  name: nameSchema,
  memo: memoSchema,
  deadline: deadlineSchema,
  finishedAt: finishedAtSchema,
});

export type TaskSchemaType = Output<typeof TaskSchema>;
