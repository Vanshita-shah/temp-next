"use client";
import React, { useEffect, useState } from "react";
import Filter from "../filter/Filter";
import Courses from "./Courses";
import { CoursesAPIResponse, ICourse } from "@/types/types";
import { getCourses } from "@/app/utils/user-services/getUser";

const CoursesContainer = ({ courses }: { courses: ICourse[] }) => {
  const [allCourses, setAllCourses] = useState<ICourse[]>(courses);
  console.log(allCourses);

  return (
    <>
      {allCourses && (
        <>
          <Filter />
          <Courses courses={allCourses} />
        </>
      )}
    </>
  );
};

export default CoursesContainer;
