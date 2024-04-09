export const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

type GenerateKeyArgs = {
  organizationId: string;
  ticketId: string;
  fileName: string;
  attachmentId: string;
};

export const generateS3Key = ({
  organizationId,
  ticketId,
  fileName,
  attachmentId,
}: GenerateKeyArgs) => {
  return `${organizationId}/${ticketId}/${fileName}-${attachmentId}`;
};
