import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../redux/actions/courseAction.js";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  // state = {
  //   course: {
  //     title: "",
  //   },
  // };

  // handleChange = (event) => {
  //   const course = {...this.state.course, title: event.target.value };
  //   this.setState({course});
  // }

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Since we didn't declare mapDispatchToProps, connect automaticaly adds Dispatch as a prop.
  //   // Remember: You have to dispatch an action. If you just call an action creater it won't do anything.
  //   // Action creaters just return an object.
  //   // this.props.dispatch(courseActions.createCouse(this.state.course))
  //   this.props.actions.createCouse(this.state.course)
  // }

  state = {
    redirectToAddCoursePage: false,
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }

  handleDeleteCourse = async (course) => {
    toast.success("Course deleted");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    // Prefer fragments over div since fragments since fragments avoid creating needless elements in the DOM
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Course</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add New Course
            </button>
            <CourseList
              courses={this.props.courses}
              onDeleteClick={this.handleDeleteCourse}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  // dispatch: PropTypes.func.isRequired,
  // createCouse: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

// When we omit mapDispatchToProps, our component gets a dispatch prop injected automatically
function mapDispatchToProps(dispatch) {
  // return {
  //   // Remember, if you don't call dispatch, nothing will happen. Action creators must be called by dispatch
  //   // createCouse: course => dispatch(courseActions.createCouse(course))
  //   // actions: bindActionCreators(courseActions, dispatch),
  // };
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    },
  };
}

// Connect automatically passes dispatch in if we omit mapDispatchToProps here
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
