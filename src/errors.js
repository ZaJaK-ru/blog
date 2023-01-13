/* eslint-disable import/prefer-default-export */
export const server = {
  username: {
    type: 'server',
    message: 'Something went wrong with username',
  },
  email: {
    type: 'server',
    message: 'Something went wrong with email',
  },
  password: {
    type: 'server',
    message: 'Something went wrong with password',
  },
  emailOrPassword: {
    type: 'server',
    message: 'Email or password invalid',
  },
  image: {
    type: 'server',
    message: 'Something went wrong with image',
  },
}

export const client = {
  username: {
    required: 'Enter username',
    minLength: {
      value: 3,
      message: 'Your username needs to be at least 3 characters.',
    },
    maxLength: {
      value: 20,
      message: 'Your username needs to be at maximum 20 characters.',
    },
  },
  email: {
    required: 'Enter email',
    minLength: {
      value: 6,
      message: 'Your email needs to be at least 6 characters.',
    },
  },
  password: {
    required: 'Enter valid password',
    minLength: {
      value: 8,
      message: 'Your password needs to be at least 8 characters.',
    },
    maxLength: {
      value: 40,
      message: 'Your password needs to be at maximum 40 characters.',
    },
  },
  passwordConfirmation: {
    required: 'Please input your password confirmation.',
    minLength: {
      value: 8,
      message: 'Your password needs to be at least 8 characters.',
    },
    maxLength: {
      value: 40,
      message: 'Your password needs to be at maximum 40 characters.',
    },
  },
  checkbox: {
    required: 'Please accept the terms and conditions to continue',
  },
  image: {
    required: 'Enter valid url',
    minLength: {
      value: 6,
      message: 'Your url needs to be at least 8 characters.',
    },
    maxLength: {
      value: 120,
      message: 'Your url needs to be at maximum 40 characters.',
    },
  },
}
