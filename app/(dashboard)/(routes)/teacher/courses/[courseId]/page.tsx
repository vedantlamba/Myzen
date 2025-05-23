const CourseIdPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const courseId = (await params).courseId;
  return <div>Course Id : {courseId}</div>;
};

export default CourseIdPage;
