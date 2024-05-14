'use client'
import Image from "next/image";
import React, { useState } from 'react';
import html2canvas from 'html2canvas';

export default function Home() {

  const [cards, setCards] = useState([
    { id: 1, isFlipped: false },
    { id: 2, isFlipped: false },
    { id: 3, isFlipped: false },
    { id: 4, isFlipped: false },
    { id: 5, isFlipped: false },
    { id: 6, isFlipped: false },
    { id: 7, isFlipped: false },
    { id: 8, isFlipped: false },
    { id: 9, isFlipped: false },
    { id: 10, isFlipped: false },
    { id: 11, isFlipped: false },
    { id: 12, isFlipped: false },
    { id: 13, isFlipped: false },
    { id: 14, isFlipped: false },
    { id: 15, isFlipped: false },
    { id: 16, isFlipped: false },
    // 可以继续添加更多卡牌对象
  ]);

  const handleFlip = (id) => {
    setCards(cards.map(card => {
      if (card.id === id) {
        return { ...card, isFlipped: !card.isFlipped };
      }
      return card;
    }))
  };

  const saveWebpageAsImage = () => {
    html2canvas(document.body).then(function(canvas) {
      var link = document.createElement('a');
      link.download = 'webpage.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };


  // 定义拖拽开始时的处理函数
  function dragStart(event) {
    event.dataTransfer.setData("text", event.currentTarget.id);
    console.log(event.currentTarget.id);
  }

  // 定义允许放置的处理函数
  function allowDrop(event) {
    event.preventDefault();
  }

  // 定义放置时的处理函数
  function drop(event) {
    event.preventDefault();
    const cardId = event.dataTransfer.getData("text");
    const card = document.getElementById(cardId);
    if (card) {
      const container = event.target;
      container.appendChild(card);
    } else {
        console.error("Element not found:", cardId);
    }
  }

  return (
    <main className="grid p-10">
     
     <button onClick={saveWebpageAsImage}>下载</button>

<div className="flex flex-col gap-6">
  <div className="grid grid-cols-3 gap-6">
    <div className="w-full shadow-md text-black" >
      <p className="text-center font-bold text-white">100% 区域</p>
    </div>
    <div className="w-full shadow-md">
      <p className="text-center font-bold text-white">70% 区域</p>
    </div>
    <div className="w-full shadow-md">
      <p className="text-center font-bold text-white">50% 区域</p>
    </div>
  </div>
  <div className="grid grid-cols-3 gap-6">
    <div id="100percent" onDragOver={allowDrop} onDrop={drop} className="w-full bg-white p-6 shadow-md" >
    </div>
    <div  id="70percent" onDragOver={allowDrop} onDrop={drop} className="w-full bg-white p-6 shadow-md">
    </div>
    <div id="50percent" onDragOver={allowDrop} onDrop={drop}  className="w-full bg-white p-6 shadow-md">
    </div>
  </div>
  <div className="container bg-card">
  {cards.map(card => (
      <div id={`card${card.id}`} key={card.id} className={`card-container w-64 rounded-lg border bg-card shadow-lg overflow-hidden ${card.isFlipped ? 'flipped' : ''}`} draggable="true" onDragStart={dragStart}  onClick={() => handleFlip(card.id)}>
        <div className="card-face front">
          <Image src={`/card/card${card.id}.jpg`} alt={`卡牌${card.id}`} fill/>
        </div>
        <div className="card-face back">
          <Image src={`/card/card${card.id}-back.jpg`} alt={`反面${card.id}`} fill/>
        </div>
      </div>
  ))}
  </div>
</div>
    </main>
  );
}
