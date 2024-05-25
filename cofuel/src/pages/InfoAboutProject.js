import React from 'react';
import { Container } from '../styles/GradientBackground';
import '../App.css';

const InfoAboutProject = () => {
  return (
    <Container>
      <h1>Info About the Project</h1>
      <p>
        Nowadays, the population is growing more and more. At this point, these people need to get to certain points, either in their cities or in their villages. For this reason, industries build means of transport to interconnect places of interest: these means of transport go from public transport, such as buses or trains, to private transport such as planes or cars. As the population grows, this demand for transport is growing with it proportionally.
      </p>
      <p>
        For this reason, there is a necessity to create a more conscious means of transport, that respects not only the environment but also assesses how humans have consequences in how they move throughout the world. We don’t want to reinvent the wheel, so we would be using carpooling ideas to deal with this problem. Carpooling is the sharing of car journeys so that more than one person travels in a car and prevents the need for others to have to drive to a location themselves.
      </p>
      <p>
        As CoFuel, we want to deal with the management of daily trips. More precisely, how drivers and passengers can share a car to save money in a more open and equal way. To achieve this, as mentioned aforementioned, CoFuel will be using the carpooling idea for the integration of the trip’s idea, and Google APIs (related to maps), to provide the most optimal route for the driver to pick up the passengers, and the deviation it costs.
      </p>
    </Container>
  );
};

export default InfoAboutProject;
