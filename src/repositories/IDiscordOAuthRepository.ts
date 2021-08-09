export type ISendOAuthRequestDTO = {
  queryParams: string;
  headers: Record<string, unknown>;
};

export type ISendOAuthRequestResponseDTO = {
  accessToken: string;
};

export abstract class IDiscordOAuthRepository {
  public abstract sendOAuthRequest(
    queryParams: ISendOAuthRequestDTO,
  ): Promise<ISendOAuthRequestResponseDTO>;
}
