import { HttpHtmlResponse } from "@server/messages/responses/HttpHtmlResponse.ts";
import { HttpJsonResponseCommon } from "@server/messages/responses/HttpJsonResponse.common.ts";
import { FileService } from "@server/services/files/file.service.ts";
import { TemplateService } from "@server/services/templates/template.service.ts";
import { Template } from "@server/services/templates/template.enum.ts";

export class HttpInstructionController {
  static create() {
    return new HttpInstructionController();
  }

  private constructor() {}

  public async index() {
    const template = TemplateService.path(Template.Instruction);
    const result = await FileService.read(template);

    if (result === undefined) {
      return HttpJsonResponseCommon.nofile({ path: template });
    }

    return HttpHtmlResponse.success(result);
  }
}
