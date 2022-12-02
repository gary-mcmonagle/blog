export const createBlog = async (body: {
  templateId: string;
  content: any;
  urlSlug: string;
}) => {
  console.log("POSTING");
  await sleep(3);
};

async function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
