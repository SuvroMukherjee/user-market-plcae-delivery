export const calculateReview = (reviews) => {
    if (reviews.length === 0) {
        return 0; // default to 0 if there are no reviews
    }

    const totalRating = reviews.reduce((sum, review) => sum + parseInt(review.rating), 0);
    const averageRating = totalRating / reviews.length;

    // setAvgRating(averageRating?.toFixed(1))

    return averageRating?.toFixed(1)  //4.3
}

// rating by ID
export const ratingCalculation = (id, reviewData) => {
    let filterReview = reviewData?.filter((item) => (
        item?.proId == id
    ));
    

    if (!filterReview || filterReview.length === 0) {
        return 0;
    }
    const sumOfRatings = filterReview.reduce((total, review) => {
        return total + parseInt(review.rating);
    }, 0);

    const averageRating = sumOfRatings / filterReview.length;
    return averageRating;
};

//total reviews by Id
export const totalReview = (id, reviewData) => {

    let filterReview = reviewData?.filter((item) => (
        item?.proId == id
    ));
    

    if (!filterReview || filterReview.length === 0) {
        return 0;
    }
    else {
        return filterReview.length
    }
};