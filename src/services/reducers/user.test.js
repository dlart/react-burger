import reducer from './user';
import { getUser, loginUser, logoutUser, resetPasswordRequest, resetPasswordReset, updateUser } from '../actions/user'
import { initialState } from './user';

describe('user test', () => {
  // getUser
  
  it('should handle get user pending', () => {
    const action = {
      type: getUser
        .pending
        .type
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      request: true,
    });
  });
  
  it('should handle get user fulfilled', () => {
    const action = {
      type: getUser
        .fulfilled
        .type,
      payload: {
        user: {
          name: 'test',
          email: 'test',
        },
      },
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      request: false,
      requestSuccess: true,
      isLoggedIn: true,
      user: {
        name: action.payload.user.name,
        email: action.payload.user.email,
        password: '',
      }
    });
  });
  
  it('should handle get user rejected', () => {
    const action = {
      type: getUser
        .rejected
        .type,
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      requestFailed: true,
    });
  });
  
  // updateUser
  
  it('should handle update user pending', () => {
    const action = {
      type: updateUser
        .pending
        .type
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      updateRequest: true,
    });
  });
  
  it('should handle update user fulfilled', () => {
    const action = {
      type: updateUser
        .fulfilled
        .type,
      payload: {
        user: {
          name: 'test',
          email: 'test',
        },
      },
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      updateRequest: false,
      updateRequestSuccess: true,
      user: {
        name: action.payload.user.name,
        email: action.payload.user.email,
        password: '',
      }
    });
  });
  
  it('should handle update user rejected', () => {
    const action = {
      type: updateUser
        .rejected
        .type,
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      updateRequestFailed: true,
    });
  });
  
  // resetPasswordRequest
  
  it('should handle reset password request pending', () => {
    const action = {
      type: resetPasswordRequest
        .pending
        .type
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      resetPasswordRequest: true,
    });
  });
  
  it('should handle reset password request fulfilled', () => {
    const action = {
      type: resetPasswordRequest
        .fulfilled
        .type,
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      resetPasswordRequest: false,
      resetPasswordRequestSuccess: true,
    });
  });
  
  it('should handle reset password request rejected', () => {
    const action = {
      type: resetPasswordRequest
        .rejected
        .type,
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      resetPasswordRequest: false,
      resetPasswordRequestFailed: true,
    });
  });
  
  // resetPasswordReset
  
  it('should handle reset password reset pending', () => {
    const action = {
      type: resetPasswordReset
        .pending
        .type
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      resetPasswordResetRequest: true,
    });
  });
  
  it('should handle reset password reset fulfilled', () => {
    const action = {
      type: resetPasswordReset
        .fulfilled
        .type,
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      resetPasswordResetRequest: false,
      resetPasswordResetRequestSuccess: true,
    });
  });
  
  it('should handle reset password reset rejected', () => {
    const action = {
      type: resetPasswordReset
        .rejected
        .type,
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      resetPasswordResetRequest: false,
      resetPasswordResetRequestFailed: true,
    });
  });
  
  // logoutUser
  
  it('should handle logout user pending', () => {
    const action = {
      type: logoutUser
        .pending
        .type
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      logoutRequest: true,
    });
  });
  
  it('should handle logout user fulfilled', () => {
    const action = {
      type: logoutUser
        .fulfilled
        .type,
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      logoutRequest: false,
      logoutRequestSuccess: true,
      isLoggedIn: false,
      user: {
        name: '',
        email: '',
        password: '',
      },
    });
  });
  
  it('should handle logout user rejected', () => {
    const action = {
      type: logoutUser
        .rejected
        .type,
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      logoutRequest: false,
      logoutRequestFailed: true,
    });
  });
  
  // loginUser
  
  it('should handle login user pending', () => {
    const action = {
      type: loginUser
        .pending
        .type
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      loginRequest: true,
    });
  });
  
  it('should handle login user fulfilled', () => {
    const action = {
      type: loginUser
        .fulfilled
        .type,
      payload: {
        user: {
          name: 'test',
          email: 'test',
        },
      },
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      loginRequest: false,
      loginRequestSuccess: true,
      isLoggedIn: true,
      user: {
        name: action.payload.user.name,
        email: action.payload.user.email,
        password: '',
      },
    });
  });
  
  it('should handle login user rejected', () => {
    const action = {
      type: loginUser
        .rejected
        .type,
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      loginRequest: false,
      loginRequestFailed: true,
    });
  });
});
