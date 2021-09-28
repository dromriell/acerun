import {
  SET_COURSE_RESULTS,
  SET_COURSE_FILTERS,
  CLEAR_COURSE_FILTERS,
} from "../actions/courseActions";

const filterCourses = (courses, courseFilters) => {
  // Use to filter courses and return a filtered array
  const filteredCourses = courses.filter((course) => {
    for (courseFilter in courseFilters) {
      if (!courseFilters[courseFilter]) {
        continue;
      }
      if (
        courseFilter === "holeMin" &&
        +course["holes"] >= courseFilters[courseFilter]
      ) {
        continue;
      }
      if (
        course[courseFilter] !== "yes" ||
        course[courseFilter] === undefined
      ) {
        return false;
      }
    }
    return true;
  });
  return filteredCourses;
};

const initialState = {
  filters: null,
  courseSearchResults: [],
  filteredResults: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COURSE_RESULTS:
      let filterdResults = [];
      if (state.filters) {
        filterdResults = filterCourses(
          action.courseSearchResults,
          state.filters
        );
      }
      return {
        ...state,
        courseSearchResults: action.courseSearchResults,
        filteredResults: action.courseSearchResults,
      };
    case SET_COURSE_FILTERS:
      if (state.courseSearchResults.length === 0) {
        return { ...state, filters: action.filters };
      }

      const filteredCourses = filterCourses(
        state.courseSearchResults,
        action.filters
      );

      console.log(
        "SET_FILTERS",
        state.courseSearchResults.length,
        action.filters,
        filteredCourses.length
      );

      return {
        ...state,
        filters: action.filters,
        filteredResults: filteredCourses,
      };
    case CLEAR_COURSE_FILTERS:
      return {
        ...state,
        filters: null,
        filteredResults: [],
      };
    default:
      return state;
  }
};
