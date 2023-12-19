import React from 'react';
import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
  configure,
  within,
  waitFor,
  fireEvent
} from "@testing-library/react";
import App from '../App';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import userEvent from "@testing-library/user-event" 
import { renderToString } from 'react-dom/server';


const { getComputedStyle } = global.window;
Enzyme.configure({ adapter: new Adapter() })
describe('Jest test case', () =>{

  beforeEach(() =>{
    window.crypto = jest.fn();
    window.crypto.getRandomValues = jest.fn();
    window.getComputedStyle = (eletm, select) => getComputedStyle(eletm, select);
  });

  it('check column name', () => {
    render(<App />);
    const gridElement=screen.getByTestId('my-link');
    expect(gridElement).toBeInTheDocument();
    expect(gridElement).toHaveTextContent(/Employee Name/i);
    expect(gridElement).toHaveTextContent(/Designation/i);
    expect(gridElement).toHaveTextContent(/Mail/i);
    expect(gridElement).toHaveTextContent(/Location/i);
    expect(gridElement).toHaveTextContent(/Status/i);
    expect(gridElement).toHaveTextContent(/Trustworth/i);
    expect(gridElement).toHaveTextContent(/Rating/i);
    expect(gridElement).toHaveTextContent(/Software Proficiency/i);
    expect(gridElement).toHaveTextContent(/Current Salary/i);
    expect(gridElement).toHaveTextContent(/Address/i);
  });
  
  it('check number of column', () => {
    const wrapper = shallow(<App />)
    const buttonElement  = wrapper.find('#column');
    expect(buttonElement).toHaveLength(12);

  })
  it('search bar input rendered', () => {
    render(<App/>);
    const searchInputEl=screen.getByPlaceholderText(/Search/i);
    expect(searchInputEl).toBeInTheDocument()
    expect(searchInputEl.value).toBe("")
    const searchShowOrHideToggle=screen.getByPlaceholderText(/Search/i);
    userEvent.click(searchShowOrHideToggle)
    expect(searchShowOrHideToggle.type).toEqual('search')

  })
  it("all rows selected via button clickable", async () => {

    render(<App/>);
    // no rows are selected initially
    const nameElement=screen.getByLabelText("Select all checkbox")
    fireEvent.click(nameElement)
    expect(nameElement).toBeInTheDocument();

  });





});
