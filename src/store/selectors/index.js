import {createSelector} from 'reselect'

export const selectCart = store => store.cart

export const selectDishes = store => store.dishes

export const selectRestaurants = store => store.restaurants

export const selectReviews = store => store.reviews

export const selectUsers = store => store.users

export const selectOrderedDishes = createSelector(
  selectCart,
  selectRestaurants,
  selectDishes,
  (cart, restaurants, dishes) => {
    return restaurants.reduce(
      (result, restaurant) => {
        restaurant.menu.forEach(dishId => {
          const dish = dishes[dishId]
          const amount = cart[dishId]
          if (amount) {
            const totalDishPrice = amount * dish.price
            result.totalPrice += totalDishPrice
            result.dishes.push({
              dish,
              amount,
              totalDishPrice,
            })
          }
        })
        return result
      },
      {
        dishes: [],
        totalPrice: 0,
      }
    )
  }
)

export const selectDishAmount = (store, ownProps) => {
  return store.cart[ownProps.dishId] || 0
}
export const selectDish = (store, ownProps) => {
  return store.dishes[ownProps.dishId]
}

export const selectReview = (store, ownProps) => {
  return store.reviews[ownProps.reviewId]
}

export const selectReviewInfo = createSelector(
  selectReview,
  selectUsers,
  (review, users) => {
    return {
      ...review,
      user: users[review.userId],
    }
  }
)

export const selectUser = (store, ownProps) => {
  return store.users[ownProps.userId]
}

export const selectRestaurantReviews = (store, ownProps) => {
  let reviews = []
  ownProps.reviews.forEach(reviewId => {
    reviews.push({...store.reviews[reviewId]})
  })
  console.log('reviews in selector', reviews)
  return reviews
}

export const selectRestaurantRating = createSelector(
  selectRestaurantReviews,
  reviews => {
    const rawRating =
      reviews.reduce((acc, {rating}) => {
        return acc + rating
      }, 0) / reviews.length
    const normalizedRating = Math.floor(rawRating * 2) / 2

    return normalizedRating
  }
)
