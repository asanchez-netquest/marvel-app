"use client";
import "../../Static/scss/Styles.scss";
import { useState, useEffect } from "react";
import HomeService from "./HomeService";
import NavbarComponent from "@/components/navbarComponent";
import FooterComponent from "@/components/footerComponent";
import LoadingComponent from "@/components/loadingComponent";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#EA3C3C",
  "#31DEE5",
  "#FD7D3D",
  "#76EC81",
  "#3761FB",
  "#8E42CF",
  "#FF6DC6",
  "#262A2E",
  "#949494",
  "#B82F2F",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function LandingPage() {
  const [characters, setCharacters] = useState([]);
  const [characterDetails, setCharacterDetails] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  const handleRepoChange = (e) => {
    fetchDataByCharacter(e.target.value);
  };

  const fetchDataByCharacter = async (filterValue) => {
    setSearching(true);
    HomeService.getDataByCharacterFunction(filterValue)
      .then((res) => {
        setCharacterDetails(res.data);
        setSearching(false);
      })
      .catch((error) => {
        setSearching(false);
        if (error.response) {
          setError(error.response.status + " - " + error.response.data.error);
        } else {
          setError("Ups!! Something went wrong - " + error.message);
        }
      });
  };

  const fetchListCharacters = async () => {
    setSearching(true);
    HomeService.getListCharactersFunction()
      .then((res) => {
        setCharacters(res.data);
        setSearching(false);
      })
      .catch((error) => {
        setSearching(false);
        if (error.response) {
          setError(error.response.status + " - " + error.response.data.error);
        } else {
          setError("Ups!! Something went wrong - " + error.message);
        }
      });
  };

  useEffect(() => {
    fetchListCharacters();
  }, []);

  return (
    <>
      <div className="section">
        <div className="columns">
          <div className="column">
            <NavbarComponent title=" " />
          </div>

          <div className="field">
            <label className="label">Select Marvel Character</label>

            <div className="control">
              <div className="select">
                <select onChange={(e) => handleRepoChange(e)}>
                  <option value="">Select dropdown</option>

                  {characters.data &&
                    // .sort((a, b) => a.name - b.name)
                    characters.data.results.map((character) => (
                      <option value={character.id}>{character.name}</option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <section className="hero">
          <div className="columns is-vcentered is-centered">
            <div className="column">
              {searching ? (
                <center>
                  <LoadingComponent />
                </center>
              ) : (
                <>
                  <center>
                    
                    <div className="columns">
                      <div className="column is-half">
                        <figure class="image is-4by5">
                          { characterDetails.data && (
                          <img
                            src={
                              characterDetails.data.results[0].thumbnail.path +
                              "." +
                              characterDetails.data.results[0].thumbnail
                                .extension
                            }
                          />
                          )
                        }
                        </figure>

                        <br />
                      </div>
                      <div className="column is-half">
                        <div class="list-item">
                          {characterDetails.data &&
                            characterDetails.data.results[0].series.items.map(
                              (movies) => <li> {movies.name}</li>
                            )}
                        </div>
                      </div>
                    </div>
                  </center>
                </>
              )}
            </div>
          </div>
        </section>
      </div>

      <div className="section">
        <FooterComponent />
      </div>
    </>
  );
}
