'use client'
import Image from "next/image";
import React, { useState } from 'react';
import html2canvas from 'html2canvas';

export default function Home() {

  const [hasImage100, setHasImage100] = useState(false);
  const [hasImage70, setHasImage70] = useState(false);
  const [hasImage50, setHasImage50] = useState(false);

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
      const container = event.target.closest('.drop-zone'); // 确保获取的是容器元素
      container.appendChild(card);
      // 根据容器的 ID 更新状态
      if (container.id === '100percent') setHasImage100(true);
      if (container.id === '70percent') setHasImage70(true);
      if (container.id === '50percent') setHasImage50(true);
    } else {
        console.error("Element not found:", cardId);
    }
  }

  return (
    <main className="grid p-10">
    <div className="flex justify-center py-3">
      <button className="text-black" onClick={saveWebpageAsImage}>下载</button>
    </div>

<div className="flex flex-col">
  <div className="grid grid-cols-3 gap-6">
    <div className="w-full shadow-sm bg-black rounded-md py-3" >
      <p className="text-center text-white">100% 区域</p>
    </div>
    <div className="w-full shadow-sm bg-gray-700 rounded-md py-3">
      <p className="text-center text-white">70% 区域</p>
    </div>
    <div className="w-full shadow-sm bg-gray-400 rounded-md py-3">
      <p className="text-center text-white">50% 区域</p>
    </div>
  </div>
  <div className="grid grid-cols-3 gap-6 py-3">
    <div id="100percent" onDragOver={allowDrop} onDrop={drop} className="card-drop rounded-md w-full bg-white p-6 shadow-md grid grid-cols-2 auto-rows-max gap-2 drop-zone" >
      {!hasImage100 && <p>正面100%是你的牌放这</p>}
    </div>
    <div  id="70percent" onDragOver={allowDrop} onDrop={drop} className="card-drop rounded-md w-full bg-white p-6 shadow-md grid grid-cols-2 auto-rows-max gap-2 drop-zone">
     {!hasImage70 && <p>正面70%是你的牌放这</p>}
    </div>
    <div id="50percent" onDragOver={allowDrop} onDrop={drop}  className="card-drop rounded-md w-full bg-white p-6 shadow-md grid grid-cols-2 auto-rows-max gap-2 drop-zone">
      {!hasImage50 && <p>两面各占一半的牌放这</p>}
    </div>
  </div>
  <p className="text-center text-red-500 py-3">点击图片支持翻转，拖拽图片至上方三个白色区域</p>
  <div id="card-contaner" className="container bg-card">
  {cards.map(card => (
      <div id={`card${card.id}`} key={card.id} className={`card-container w-64 h-64 rounded-lg border bg-card shadow-lg overflow-hidden ${card.isFlipped ? 'flipped' : ''}`} draggable="true" onDragStart={dragStart}  onClick={() => handleFlip(card.id)}>
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
