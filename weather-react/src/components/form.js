import React from "react";
import styled, { createGlobalStyle, css } from "styled-components";
import UpdateUser from "../api/UpdateUser";

const GlobalStyle = createGlobalStyle`
  html, body{
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(to bottom, #f05053, #e1eec3) fixed;
    height: 100vh;
    margin: 0;
    color: #555;
  }
`;

const sharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  ${sharedStyles}
`;

const StyledButton = styled.button`
  display: block;
  background-color: #f7797d;
  color: #fff;
  font-size: 0.9rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
`;

const StyledError = styled.div`
  color: red;
  font-weight: 800;
  margin: 0 0 40px 0;
`;

function Form(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted!");

    for (let key in props.state) {
      if (props.state[key] === "") {
        props.setError(`You must provide the ${key}`);
        return;
      }
    }
    props.setError("");

    props.setState({
      Name: props.state.Name,
      Location: props.state.Location,
      Visible: false,
    });
    props.setData({
      Name: props.state.Name,
      Location: props.state.Location,
      Visible: false,    
    });
    UpdateUser(props);

    console.log("Succeeded!!!");
  };

  const handleInput = (e) => {
    const inputName = e.currentTarget.name;
    const value = e.currentTarget.value;
    props.setState((prev) => ({ ...prev, [inputName]: value }));
  };

  return (
    <>
      <GlobalStyle />
      <StyledFormWrapper>
        <StyledForm onSubmit={handleSubmit}>
          <h2>Sign-Up</h2>
          <label htmlFor="name">Name</label>
          <StyledInput
            type="text"
            name="Name"
            value={props.state.Name}
            onChange={handleInput}
          />
          <label htmlFor="Location">Location</label>
          <StyledInput
            type="Location"
            name="Location"
            value={props.state.Location}
            onChange={handleInput}
          />
          {props.error && (
            <StyledError>
              <p>{props.error}</p>
            </StyledError>
          )}
          <StyledButton type="submit">Register</StyledButton>
        </StyledForm>
      </StyledFormWrapper>
    </>
  );
}

export default Form;
