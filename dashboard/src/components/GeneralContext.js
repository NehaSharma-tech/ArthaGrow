import React, { useState, createContext } from "react";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = createContext({
  openBuyWindow:   (uid) => {},
  closeBuyWindow:  ()    => {},
  openSellWindow:  (uid) => {},
  closeSellWindow: ()    => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen,  setIsBuyWindowOpen]  = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");

  const handleOpenBuyWindow  = (uid) => { setSelectedStockUID(uid); setIsBuyWindowOpen(true);  setIsSellWindowOpen(false); };
  const handleCloseBuyWindow = ()    => { setIsBuyWindowOpen(false);  setSelectedStockUID(""); };

  const handleOpenSellWindow  = (uid) => { setSelectedStockUID(uid); setIsSellWindowOpen(true);  setIsBuyWindowOpen(false); };
  const handleCloseSellWindow = ()    => { setIsSellWindowOpen(false); setSelectedStockUID(""); };

  return (
    <GeneralContext.Provider value={{
      openBuyWindow:   handleOpenBuyWindow,
      closeBuyWindow:  handleCloseBuyWindow,
      openSellWindow:  handleOpenSellWindow,
      closeSellWindow: handleCloseSellWindow,
    }}>
      {props.children}

      {/* Action windows render at top level so they overlay everything */}
      {isBuyWindowOpen  && <BuyActionWindow  uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;