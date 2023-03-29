import renderer from 'react-test-renderer'
import * as React from 'react'
import Home from '../pages/index';

//Basic snapshot test to expect the Home page to render as expected

//--Test Note - Given more time on this, i would test individual components or follow a TDD approach to this test
jest.mock('../hooks/usePastLaunches');
jest.mock('next/head');
jest.mock('../components');
jest.mock('@mantine/core');
jest.mock('@tanstack/react-query');

const renderTree = (tree: JSX.Element) => renderer.create(tree);
describe('<Home>', () => {
  it('Home page rendered', () => {
    expect(renderTree(<Home 
    />).toJSON()).toMatchSnapshot();
  });
  
});