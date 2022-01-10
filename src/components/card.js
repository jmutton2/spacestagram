import React from 'react';
import { useState, useEffect } from 'react';

function Card() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([{}]);

  useEffect(() => {
    fetch("https://api.nasa.gov/planetary/apod?api_key=dTxpSK6YJn6SNSNzNrEAlSdWipGMEd0P6UXMFv4l&count=3")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>LOADING</div>;
  } else {
    try {
        return (
            <div class="card">
                <div class="image">
                <div class="image-stack">
                        <div class="image-stack__item image-stack__item--top">
                            <img src={items[0].url} style={{height: '500px',width:'500px'}}/>
                        </div>
                        <div class="image-stack__item image-stack__item--bottom">
                            <img src={items[1].url} style={{height: '500px',width:'500px'}}/>
                        </div>
                    </div>
                </div>
                <div class="Text">
                    <div>
                        {items[0].title}
                        <br/>
                        {items[0].date}
                        <br/>
                        {items[0].explanation}
                    </div>
                    <div>
                        {items[1].title}
                        <br/>
                        {items[1].date}
                        <br/>
                        {items[1].explanation}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <p>an error has occured</p>
        )
    }
    
  }
}

export default Card;
