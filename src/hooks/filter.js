import { useEffect, useState } from 'react';

const useFilterEffect = (groups, queries) => {
  const [matchingGroups, setMachingGroups] = useState([]);
  useEffect(() => {
    console.log('inside useEffect: ', groups);
    if (queries.length !== 0) {
      setMachingGroups(groups.filter(cur => queries.some(query => cur.name.includes(query))));
    } else {
      setMachingGroups(groups);
    }
  }, [groups, queries]);
  return matchingGroups;
};

export default useFilterEffect;
