import axios from "axios";
import { useQuery } from "react-query";

const fetchUser = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const DependentQueriesPage = ({ email }) => {
  // Step 1: fetch the user
  const { data: user } = useQuery(["user", email], () => fetchUser(email));
  // Step 2: get the channelId associated with this user
  const channelId = user?.data.channelId;
  // Step 3: Only after that, fetch the courses for this user, making sure that the dependant useQuery
  // executed only after receiving the positive result from the first one.

  const { data: courses } = useQuery(
    ["courses", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId, // double negation transform the value to a boolean (true or false)
    }
  );

  console.log(courses?.data.courses);

  return <div>Dependent Queries</div>;
};
