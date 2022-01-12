import React from 'react';
import { useState, useEffect } from 'react';



function Card() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([{}]);
  const [myRef, setMyRef] = useState(React.createRef());
  const [state,setScrollTop] = useState(0);

  function onScroll() {
    const scrollTop = myRef.current.scrollTop
    console.log(` myRef.scrollTop: ${scrollTop}`);
    setScrollTop(scrollTop);
  }

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
                <div class="image-stack__item image-stack__item--top image-stack__item--top-transition">
                  <img src={items[0].url} style={{height: '500px',width:'500px'}}/>
                </div>
                <div class="image-stack__item image-stack__item--bottom image-stack__item--bottom-transition">
                  <img src={items[1].url} style={{height: '500px',width:'500px'}}/>
                </div>
              </div>
            </div>
            <div class="text"
                  ref={myRef}
                  onScroll={onScroll}>
              <div  class="item">
                {/* {items[0].title} */}
                <br/>
                {items[0].date}
                <br/>
                {items[0].explanation}
              </div>
              <div class="item">
                {/* {items[1].title} */}
                <br/>
                {items[1].date}
                <br/>
                {items[1].explanation}
              </div>
              <div class="item">
                {/* {items[2].title} */}
                <br/>
                {items[2].date}
                <br/>
                {items[2].explanation}
              </div>
          </div>
        </div>
      );
    } 
    catch (error) {
      return (
        <p>an error has occured</p>
      )
    }
  }
}

export default Card;
