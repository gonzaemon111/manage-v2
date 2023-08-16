import "reflect-metadata";
import axios, { AxiosInstance } from "axios";
import { injectable } from "inversify";
import { ErrorResponse } from "@/server/domain/Error";
import { Failure, Success } from "@/server/shared/Result";

interface Task {
  readonly id: number;
  readonly name: string;
  readonly memo?: string;
  readonly deadline?: string;
  readonly finished_at?: string;
}

type CreateParams = Omit<Task, "id">;

interface UpdateParams {
  readonly name?: string;
  readonly memo?: string;
  readonly deadline?: string;
  readonly finished_at?: string;
}

interface GetTasksResponse {
  readonly tasks: Array<Task>;
}

@injectable()
export class TaskClient {
  private readonly client: AxiosInstance;
  private readonly url = process.env.LAGRING_BASE_URL;

  constructor() {
    this.client = axios.create({
      baseURL: `${this.url}/api/tasks`,
      headers: { "Content-Type": "application/json" },
      responseType: "json",
    });
  }

  public async getTasks(token: string) {
    try {
      const response = await this.client.get<GetTasksResponse>("/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return new Success(response.data);
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  public async getDetail(id: number, token: string) {
    try {
      const response = await this.client.get<Task>(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return new Success(response.data);
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  public async create(task: CreateParams, token: string) {
    try {
      const response = await this.client.post<Task>(
        "/",
        { task },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return new Success(response.data);
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  public async update(task: UpdateParams, taskId: number, token: string) {
    try {
      const response = await this.client.patch<Task>(
        `/${taskId}`,
        { task },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return new Success(response.data);
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  public async delete(taskId: number, token: string) {
    try {
      const response = await this.client.delete<Task>(`/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return new Success(response.data);
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  private errorResponse(error: any): Failure<ErrorResponse> {
    if (axios.isAxiosError(error)) {
      return new Failure({
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }
    return new Failure({
      status: 500,
      data: "予期せぬエラーが発生しました",
      message: "予期せぬエラーが発生しました",
    });
  }
}
