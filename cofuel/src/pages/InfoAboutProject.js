import React from 'react';
import styled, { keyframes } from 'styled-components';

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #66ffcc, #ffcc66);
  background-size: 200% 200%;
  animation: ${gradientBackground} 10s ease infinite;
  padding: 50px;
  color: #333;
  min-height: 100vh;
  position: relative;
`;

const Section = styled.section`
  margin-bottom: 50px;
  width: 80%;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #333;
`;

const Subtitle = styled.h2`
  font-size: 2em;
  margin-bottom: 15px;
  color: #555;
`;

const Text = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
  color: #666;
  text-align: justify;
`;

const Figure = styled.figure`
  margin: 30px 0;
  text-align: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }

  figcaption {
    margin-top: 10px;
    font-size: 1em;
    color: #777;
  }
`;

const List = styled.ul`
  list-style-type: disc;
  margin: 20px 0;
  padding-left: 40px;
  color: #666;

  li {
    margin-bottom: 10px;
  }
`;

const AboutProject = () => {
  return (
    <div>
      <AboutContainer>
        <Title>About the Project</Title>
        <Section>
          <Subtitle>1. Description of the problem</Subtitle>
          <Text>
            Nowadays, the population is growing more and more. At this point, these people need to get to certain points, either in their cities or in their villages. For this reason, industries build means of transport to interconnect places of interest: these means of transport go from public transport, such as buses or trains, to private transport such as planes or cars. As the population grows, this demand for transport is growing with it proportionally.
          </Text>
          <Text>
            For this reason, there is a necessity to create a more conscious means of transport, that respects not only the environment but also assesses how humans have consequences in how they move throughout the world. We don’t want to reinvent the wheel, so we would be using carpooling ideas to deal with this problem. Carpooling is the sharing of car journeys so that more than one person travels in a car and prevents the need for others to have to drive to a location themselves.
          </Text>
          <Text>
            As CoFuel, we want to deal with the management of daily trips. More precisely, how drivers and passengers can share a car to save money in a more open and equal way. To achieve this, as mentioned aforementioned, CoFuel will be using the carpooling idea for the integration of the trip’s idea, and Google APIs (related to maps), to provide the most optimal route for the driver to pick up the passengers, and the deviation it costs.
          </Text>
        </Section>
        <Section>
          <Subtitle>2. Previous research</Subtitle>
          <Text>
            In this section, we offer a detailed exploration of established solutions in this field. This includes examining similar projects and understanding the current relevance of the problem we're addressing.
          </Text>
          <Text>
            Carpooling has been increasing with time. As shown in the web statistical site Statista, the number of carpooling vehicles has increased significantly in the past years, and it doesn’t seem to stop. This shift reflects a global move towards sustainability, with individuals seeking to save money and reduce their environmental footprint. However, fuel cost calculations often remain a sticky point, creating friction and hindering wider carpool adoption.
          </Text>
          <Figure>
            <img src="path-to-your-image" alt="Carpooling statistics" />
            <figcaption>Figure 1 - Statistics Carpooling</figcaption>
          </Figure>
          <Text>
            After carefully evaluating existing solutions, we've identified some notable applications that do similar or related things to our solution. Blablacar or SharingCar are mobile apps that help people travel to places sharing the same vehicle. This is great but their fuel expenses are not well managed. In a normal carpooling experience, the owner of a vehicle creates a trip proposal and people around must accept the price the main user is requesting. This is not efficient.
          </Text>
          <Figure>
            <img src="path-to-your-image" alt="Splitwise app" />
            <figcaption>Figure 2 – Splitwise</figcaption>
          </Figure>
          <Figure>
            <img src="path-to-your-image" alt="BlaBlaCar app" />
            <figcaption>Figure 3 – BlaBlaCar</figcaption>
          </Figure>
          <Figure>
            <img src="path-to-your-image" alt="Fuelio app" />
            <figcaption>Figure 4 – Fuelio</figcaption>
          </Figure>
        </Section>
        <Section>
          <Subtitle>3. Objectives of the project</Subtitle>
          <Text>
            As we explained before, our objectives are to deal with the problems that arise when sharing gas with travelers. Not only with gas but also with vehicles and trips. Our objectives are to expose a service in a web application that helps drivers divide their gasoline with the travelers who fairly use their vehicle, not only for the driver, thus also for the traveler.
          </Text>
          <Text>
            Dealing with this problem can be tedious. We want to implement APIs that help the user establish a route and, whether is a driver or a traveler, it calculates all the deviations that the driver has to make. We also want to allow travelers to join automatically when they hop in the driver’s vehicles.
          </Text>
          <Text>
            This idea, as simple as it may seem, is not only formed to address the aforementioned problem but also to deal with more important problems, such as the pollution of our cities and the responsibility we have for nature and the environment.
          </Text>
          <Text>
            As fewer vehicles are used, fewer gases are emitted into the atmosphere, thus making CoFuel not only an option to control your vehicle gas bills but also an application to make a more conscious and respectful way of traveling in cities and villages.
          </Text>
        </Section>
        <Section>
          <Subtitle>4. Scope of the project</Subtitle>
          <Text>
            CoFuel will initially target urban areas with high commuter traffic and limited public transportation options. Our solution is designed to be scalable and adaptable to various regions and user needs. We aim to integrate seamlessly with existing transportation infrastructure while providing an intuitive and user-friendly interface for our customers.
          </Text>
        </Section>
        <Section>
          <Subtitle>5. Methodology</Subtitle>
          <Text>
            Our project will be developed in several phases, beginning with research and design, followed by development, testing, and deployment. We will use Agile methodologies to ensure flexibility and responsiveness to user feedback and changing requirements.
          </Text>
          <List>
            <li><Text>Phase 1: Research and Requirements Gathering</Text></li>
            <li><Text>Phase 2: Design and Prototyping</Text></li>
            <li><Text>Phase 3: Development</Text></li>
            <li><Text>Phase 4: Testing and Quality Assurance</Text></li>
            <li><Text>Phase 5: Deployment and Maintenance</Text></li>
          </List>
        </Section>
      </AboutContainer>
    </div>
  );
};

export default AboutProject;

