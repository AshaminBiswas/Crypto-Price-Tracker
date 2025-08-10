import React, { useContext, useEffect, useState } from 'react'
import "./Home.css"
import { CoinContext } from '../../context/CoinContext'
const Home = () => {

    const {allCoin, currency} = useContext(CoinContext)
    const [displayCoin, setDisplayCoin] = useState([])
    const [input,setInput] = useState('')

    const inputHandler = (e)=>{
        setInput(e.target.value)
        if (e.target.value === '') {
            setDisplayCoin(allCoin)
        }
        
    }

    const searchHandler = async(e)=>{
        e.preventDefault()
       const filterData =  await allCoin.filter((item)=>{
            return item.name.toLowerCase().includes(input.toLowerCase())
        })

        setDisplayCoin(filterData)
    }



    useEffect(()=>{
        setDisplayCoin(allCoin)
    },[allCoin])

  return (
    <div className='home'>
        <div className="hero">
            <h1>Crypto Marketplace</h1>
            <div>
            <p className='welcome-text'>Welcome to the world's largest cryptocurrency marketplace.</p>
            <p>Sign up for free.</p>
            </div>
            <form onSubmit={searchHandler}>
                <input onChange={inputHandler} type="text" value={input} placeholder='Search Crypto...' required />
                <button type='submit'>Search</button>
            </form>
        </div>
        <div className="crypto-table">
            <div className="table-layout">
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p style={{textAlign:"center"}}>24 / 7 Ex</p>
                <p className='market-cap'>Marker Cap</p>
            </div>
            {
                displayCoin.slice(0,20).map((item, i)=>(
                    <div className='table-layout' key={i}>
                        <p>{item.market_cap_rank}</p>
                        <div>
                            <img src={item.image} alt="Crypto image" />
                            <p>{item.name +" - "+ item.symbol}</p>
                        </div>
                        <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                        <p className={item.market_cap_change_percentage_24h < 0 ? "red" : "white"} style={{textAlign:"center"}}>{Math.floor(item.market_cap_change_percentage_24h*100)/100}</p>
                        <p className='market-cap font'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Home
