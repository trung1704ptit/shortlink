import { IsNotEmpty, Matches } from 'class-validator';

export class CreateShortLinkDto {
  @IsNotEmpty()
  @Matches(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
  originalLink: string;
}
