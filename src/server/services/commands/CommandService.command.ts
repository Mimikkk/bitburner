import { RpcJsonRequest } from "@server/messages/requests/RpcJsonRequest.ts";
import { RpcJsonResponse } from "@server/messages/responses/RpcJsonResponse.ts";

enum Method {
  Update = "pushFile",
  Remove = "deleteFile",
  Read = "getFile",
  List = "getAllFiles",
  Names = "getFileNames",
  Ram = "calculateRam",
  Definition = "getDefinitionFile",
}

export namespace Command {
  const id = 0;
  const incrementId = () => id + 1;

  const create = <M extends Method, P>(method: M, params: P): RpcJsonRequest<M, P> => {
    return RpcJsonRequest.create(incrementId(), method, params);
  };

  export type OkResponse = "OK";
  export interface FileResource {
    name: string;
    content: string;
  }

  export type UpdateParams = { filename: string; content: string; server: string };
  export const update = (params: UpdateParams) => create(Method.Update, params);
  export type UpdateResponse = RpcJsonResponse<OkResponse>;

  export type RemoveParams = { filename: string; server: string };
  export const remove = (params: RemoveParams) => create(Method.Remove, params);
  export type RemoveResponse = RpcJsonResponse<OkResponse>;

  export type ReadParams = { filename: string; server: string };
  export const read = (params: ReadParams) => create(Method.Read, params);
  export type ReadResponse = RpcJsonResponse<FileResource>;

  export type ListParams = { server: string };
  export const list = (params: ListParams) => create(Method.List, params);
  export type ListResponse = RpcJsonResponse<FileResource[]>;

  export type NamesParams = { server: string };
  export const names = (params: NamesParams) => create(Method.Names, params);
  export type NamesResponse = RpcJsonResponse<string[]>;

  export type RamParams = { filename: string; server: string };
  export const ram = (params: RamParams) => create(Method.Ram, params);
  export type RamResponse = RpcJsonResponse<number>;

  export const definition = () => create(Method.Definition, undefined);
  export type DefinitionResponse = RpcJsonResponse<string>;
}
