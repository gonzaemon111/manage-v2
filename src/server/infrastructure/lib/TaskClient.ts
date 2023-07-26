import { Failure, Success } from "@/server/shared/Result";
import axios, { AxiosInstance } from "axios";
import { injectable } from "inversify";

interface Task {
  readonly id: number;
  readonly name: string;
  readonly memo: string;
  readonly deadline: string;
  readonly finished_at: string;
}

interface GetTasksResponse {
  readonly tasks: Array<Task>;
}

@injectable()
export class TaskClient {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${process.env.LAGRING_BASE_URL}/api/tasks`,
      headers: { "Content-Type": "application/json" },
      responseType: "json",
    });
  }

  public async getTasks(token: string) {
    try {
      const response = await this.client.get<GetTasksResponse>("/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status !== 200) {
        return new Failure(response.data);
      }
      return new Success(response.data);
    } catch (error) {
      console.error(error);
      return new Failure(error);
    }
  }

  /**
   * getTask
   */
  public async getTask(id: number, token: string) {
    try {
      const response = await this.client.get<Task>(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status !== 200) {
        return new Failure(response.data);
      }
      return new Success(response.data);
    } catch (error) {
      console.error(error);
      return new Failure(error);
    }
  }
}
