import { Link, useParams } from "react-router-dom";
import LittleHeader from "../../../components/layout/LittleHeader";
import Button from "../../../components/reUse/Button";
import { useEffect, useState } from "react";
import QuizLoad from "../../static/QuizLoad";

const PastQuestionYears = () => {
  const { subject } = useParams();

  const [show, setShow] = useState<boolean>(true);

  const years = [
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011,
    2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
    2024,
  ];

  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    const importSevenData = async () => {
      const loadedYears: number[] = [];

      let pendingOperations = years.length;

      for (let i of years) {
        try {
          await import(`./subjects/${subject.toLowerCase()}/${i}.json`);
          loadedYears.push(i);
        } catch (error) {
        } finally {
          pendingOperations--;

          if (pendingOperations === 0) {
            setShow(false);
          }
        }
      }

      setAvailableYears(loadedYears);
    };

    importSevenData();
  }, [subject]);

  return (
    <div>
      <LittleHeader name="Select a year" />

      {show && <QuizLoad />}

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 ">
        {availableYears.map((el: any) => (
          <Link to={`${el}`} className="w-full">
            <Button
              className="bg-blue-950 text-white w-full m-0 py-4"
              name={el}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PastQuestionYears;
