import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // blog post has been created, navigate the use to the index
        // we navigate by calling this.context.router.push with the
        // new path to navigate to.
        this.context.router.push('/');
      });
  }

  render() {
    const { fields: {title, categories, content }, handleSubmit } = this.props;


    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <labeL>Title</labeL>
          <input type="text" className="form-control" {...title} />
          <div className="text-help form-control-label">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <labeL>Categories</labeL>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help form-control-label">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <labeL>Content</labeL>
          <textarea className="form-control" {...content} />
          <div className="text-help form-control-label">
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to='/' className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a username';
  }
  if (!values.categories) {
    errors.categories = 'Enter categories';
  }
  if (!values.content) {
    errors.content = 'Enter content';
  }

  return errors;
}

// connect: first arg is mapDispatchToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapDispatchToProps, 3rd is mapDispatchToProps

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);
