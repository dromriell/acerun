import { searchCoursesEP } from "../../utils/apiEndPoints";

export const SET_COURSE_RESULTS = "SET_COURSE_RESULTS";
export const SET_COURSE_FILTERS = "SET_COURSE_FILTERS";
export const CLEAR_COURSE_FILTERS = "CLEAR_COURSE_FILTERS";

export const setCourseFilters = (filters) => {
  return (dispatch) => {
    dispatch({ type: SET_COURSE_FILTERS, filters: filters });
  };
};

export const searchCourses = (token, searchTerm) => {
  return async (dispatch) => {
    const response = await fetch(searchCoursesEP(searchTerm), {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(searchCoursesEP(searchTerm));

    if (!response.ok) {
      const errorResponse = await response.json();
      let errorMsg = "";

      Object.entries(errorResponse).forEach(([key, value]) => {
        switch (key) {
          case "non_field_errors":
            errorMsg = errorMsg + value;
            return;
          default:
            errorMsg = errorMsg + value;
            return;
        }
      });
      throw Error(errorMsg || "An error occured!");
    }

    const courseSearchResults = await response.json();
    console.log(courseSearchResults);

    dispatch({
      type: SET_COURSE_RESULTS,
      courseSearchResults: courseSearchResults.courses,
    });
  };
};
