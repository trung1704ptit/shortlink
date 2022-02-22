import { ShortLinkStatus } from '../shortlinks-status.enum';

export class GetTasksFilterDto {
  status?: ShortLinkStatus;
  search?: string;
}
