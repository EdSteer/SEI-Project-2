import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import axios from 'axios'
import TeamMain from './TeamMain'
import TeamSidebar from './TeamSidebar'


const TeamDetails = () => {

  const [team, setTeam] = useState([])
  const [hasError, setHasError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [detailsReady, setDetailsReady] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data: { teams } } = await axios.get(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${id}`)
        setTeam(teams[0])
      } catch (err) {
        setHasError(true)
      }
    }
    getData()
  }, [id])

  useEffect(() => {
    if (loading) {
      setLoading(false)
    } else {
      setDetailsReady(true)
    }
    
  }, [team])


  console.log(team)
  console.log(hasError)
  return (
    <>
      <section className="hero is-medium is-warning">
        <div className="hero-body title-section pb-6">
          <div className="overlay">
            <div className="columns is-align-items-center">
              <div className="column is-one-fifth">
                <img className="team-badge" src={team.strTeamBadge}></img>
              </div>
              <div className="column is-four-fifth">
                <h1 className="title is-1 has-text-white has-text-left">
                  {team.strTeam}
                </h1>
                <h5 className="title is-5 has-text-white has-text-left">
                  {detailsReady && team.strKeywords.split(',')[0]}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-one-quarter-desktop is-full-mobile has-text-centered">
              <TeamSidebar team={team} />
            </div>
            <div className="column is-three-quarter-desktop is-full-mobile">
              <TeamMain team={team} />
            </div>
          </div>
        </div>

      </section>
    </>
  )

}  

export default TeamDetails