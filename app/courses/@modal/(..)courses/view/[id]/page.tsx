import notFound from "@/app/courses/not-found";
import { getCourse } from "@/app/utils/course-services/CourseServices";
import Modal from "@/components/modal/modal";
import CourseData from "@/components/viewPage/CourseData";

export default async function PhotoModal({
  params: { id },
}: {
  params: { id: string };
}) {
  // Fetch course data
  const courseData = await getCourse(id);

  // If course data is not found, render a "not found" page
  if (!courseData) {
    notFound();
  }

  // Render modal with course details if course data is available
  return (
    <>
      {courseData && (
        <Modal>
          <div className="h-[500px] w-[300px] sm:w-[350px] max-w-sm bg-white border border-gray-light rounded-lg shadow overflow-hidden ">
            <CourseData courseData={courseData} isModal={true} />
          </div>
        </Modal>
      )}
    </>
  );
}
