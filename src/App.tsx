import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { useState } from "react";
import "./App.css";

interface CarModel {
  id: number;
  name: string;
}

const futureCars: CarModel[] = [
  {
    id: 1,
    name: "Volkswagen",
  },
  {
    id: 2,
    name: "BMW",
  },
  {
    id: 3,
    name: "Toyota",
  },
  {
    id: 4,
    name: "Nissan",
  },
  {
    id: 5,
    name: "General Motors",
  },
  {
    id: 6,
    name: "Hyundai",
  },
  {
    id: 7,
    name: "Peugeot",
  },
  {
    id: 8,
    name: "Kia",
  },
  {
    id: 9,
    name: "Volvo",
  },
  {
    id: 10,
    name: "Mazda",
  },
];

function App() {
  //useStates
  const [cars, setCars] = useState(futureCars);
  const [checkedCars, setCheckedCars]: any = useState([]);

  //applyChanges button function
  const handleApplyChanges = () => {
    const myCars = [...cars];
    const myCheckedCars = [...checkedCars];

    /*
  iterate on both the arrays (all cars, checked cars)
  and remove the checked cars from the middle of the array,
  then unshift them on the top of the array
     */
    for (let i = 0; i < myCheckedCars.length; i++) {
      for (let j = 0; j < myCars.length; j++) {
        if (myCheckedCars[i].id === myCars[j].id) {
          myCars.splice(j, 1);
        }
      }
    }
    //reverse to sort the first checked car on top
    myCheckedCars.reverse();

    //unshift hte checked cars
    for (let i = 0; i < myCheckedCars.length; i++) {
      myCars.unshift(myCheckedCars[i]);
    }

    //update state
    setCars(myCars);
  };

  //getting the values of checkbox onChange of every checkbox
  const handleChange = (e: any, name: string) => {
    /*
      if not checked => when check => create a new object for the checked car,
       and push it to the checkedCars array
    */
    if (e.target.checked) {
      const newCar = { id: Number(e.target.value), name: name };

      setCheckedCars([...checkedCars, newCar]);
    } else {
      //if checked => remove the object created from the array
      const checkedCar = checkedCars.filter((car: { id: any }) => {
        return car.id !== e.target.value;
      });

      setCheckedCars(checkedCar);
    }
  };

  //Reset button function
  const handleReset = () => {
    //simply reloads the page :D
    window.location.reload();
  };

  return (
    <>
      <div className="main">
        <div className="child">
          <div className="header">
            <Button
              onClick={handleReset}
              size="small"
              sx={{
                backgroundColor: "#2A303E",
                "&:hover": { backgroundColor: "#353942" },
                width: "150px",
              }}
              variant="contained">
              Reset
            </Button>

            <Typography variant="h6" color={"#2A303E"} mx={5}>
              Future Cars
            </Typography>
            <Button
              onClick={handleApplyChanges}
              size="small"
              sx={{
                backgroundColor: "#2A303E",
                "&:hover": { backgroundColor: "#353942" },
                width: "150px",
              }}
              variant="contained">
              Apply Changes
            </Button>
          </div>
          <div className="body">
            <FormGroup>
              {cars.map((car) => {
                return (
                  <div key={car.id} className="oneCar">
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={car.id}
                          onChange={(e) => {
                            handleChange(e, car.name);
                          }}
                          sx={{
                            color: "#2A303E",
                            "& .MuiSvgIcon-root": { fontSize: 28 },
                          }}
                          checkedIcon={
                            <CheckBoxOutlinedIcon sx={{ color: "#2A303E" }} />
                          }
                        />
                      }
                      label={
                        <Typography
                          sx={{ fontWeight: "bold", color: "#2A303E" }}>
                          {car.name}
                        </Typography>
                      }
                    />
                    <Typography sx={{ fontWeight: "bold", color: "#2A303E" }}>
                      {car.id}
                    </Typography>
                  </div>
                );
              })}
            </FormGroup>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
