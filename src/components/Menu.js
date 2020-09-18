import React, { Component } from 'react'
import axios from 'axios'

class Menu extends Component {
  constructor() {
    super()
    this.state = {
      menu: [],
    }
  }

  // Budget = $300. 5 cheapest appetizers and 5 cheapest desserts. with remaining $$$ purchase as many entrees as possible
  // display the integer of total # of items.

  // List challenges
  //! a) display a list with the 5 cheapest appetizers with prices in ascending order
  //! b) then display all of the entrees I can afford with remaining $$ with prices in ascending order
  //! c) then display a list with the 5 cheapest desserts with prices in ascending order

  async getMenuData() {
    try {
      const res = await axios.get('https://www.olo.com/menu.json')
      this.setState({ menu: res.data.MenuItems })
      console.log(this.state.menu)
    } catch {
      console.log('error')
    }
  }
  componentDidMount() {
    this.getMenuData()
  }

  render() {
    // Sort Menu by price
    let menuObject = {
      appetizers: [],
      entrees: [],
      desserts: [],
    }

    let money = 300

    let sortedMenuByPrice = this.state.menu.sort(function (a, b) {
      return a.Price - b.Price
    })

    // Sort menu by Appetizer => Entree => Dessert
    let sortedMenuByType = sortedMenuByPrice.sort(function (a, b) {
      if (a.FoodType === 'appetizer') {
        return -1
      }
      if (b.FoodType === 'dessert') {
        return -100
      } else return 0
    })

    sortedMenuByType.forEach((item) => {
      if (item.FoodType === 'appetizer') {
        menuObject.appetizers.push(item)
      } else if (item.FoodType === 'entree') {
        menuObject.entrees.push(item)
      } else if (item.FoodType === 'dessert') {
        menuObject.desserts.push(item)
      }
    })

    // Sort appetizers by price
    menuObject.appetizers.sort(function (a, b) {
      return a.Price - b.Price
    })

    //Sort entrees by price
    menuObject.entrees.sort(function (a, b) {
      return a.Price - b.Price
    })

    //Sort desserts by price
    menuObject.desserts.sort(function (a, b) {
      return a.Price - b.Price
    })

    // Final Catering order

    let cheapestAppetizerDessertList = []
    let x = {}
    for (let i = 0; i <= 4; i++) {
      cheapestAppetizerDessertList.push(menuObject.appetizers[i])
      cheapestAppetizerDessertList.push(menuObject.desserts[i])
    }

    let finalMenuOrder = [[], []]
    cheapestAppetizerDessertList.forEach((item) => {
      finalMenuOrder[0].push(item)
    })

    let total = 0

    if (this.state.menu.length !== 0) {
      cheapestAppetizerDessertList.forEach((item) => {
        total = item.Price + total
      })
    }

    // console.log(total, "TOTAL!!!!!!")
    // while(total <= 300) {

    // }
    let entreeTotal = 0;
    console.log(menuObject.entrees[0])
    let remainingCash = money - total
    if (this.state.menu.length !== null) {
      for (let i = 0; i <= menuObject.entrees.length - 1; i++) {
        if (remainingCash <= 0) {
          return 0
        } else {
          finalMenuOrder[1].push(menuObject.entrees[i])
          remainingCash = remainingCash - menuObject.entrees[i].Price
          console.log(finalMenuOrder[1])
          if(finalMenuOrder.length <= 1) {finalMenuOrder[1].forEach((item) => {
            entreeTotal = item.Price + entreeTotal
            console.log(entreeTotal, 'ENTREE TOTAL!')
          })
          
        }
        }
      }
    }

    // if (this.state.menu.length !== null) {

    // console.log("are you working")
    // }

    // console.log(cheapestAppetizerDessertList[0].Price, "TEH INDEX")

    // sortedMenuByType.forEach(item =>{
    //     if(item.FoodType === "appetizer") {
    //         menuObject.appetizers.push(item)
    //     }
    //     else if(item.FoodType === "entree") {
    //        menuObject.entrees.push(item)
    //     }
    //     else if(item.FoodType === "dessert") {
    //         menuObject.desserts.push(item)
    //     }
    //  })

    //      let seperateFoodTypes = (array) => {
    //          for(let i=0; i<= array.length; i++) {
    //              if(array.type === "appetizers") {
    //                  array[i].push(this.state.appetizers)
    //              } else if(array.type ==="entrees") {
    //                  array[i].push(this.state.entrees)
    //              } else if(array.type ==="desserts") {
    //                 array[i].push(this.state.entrees)
    //             }
    //         }
    // }
    // seperateFoodTypes(sortedMenuByType);

    //      console.log(this.state.appetizers);
    //      console.log(this.state.entrees);
    //      console.log(this.state.desserts);
    return <div></div>
  }
}

export default Menu
