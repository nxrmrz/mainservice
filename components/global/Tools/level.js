/* =================================== USER LEVEL CALCULATION =================================== */

const calculateLevel = (promise, currentPoints) => {
  let points;
  let numberOfCompletedOrders;

  if (promise != false) {
    return new Promise((resolve, reject) => {
      if (currentPoints) {
        points = currentPoints;
        getLevelDetails(promise, points)
          .then(levelDetails => {
            resolve({
              level: levelDetails.level,
              minPoints: levelDetails.minPoints,
              maxPoints: levelDetails.maxPoints,
              benefits: levelDetails.benefits,
              points: levelDetails.points
            });
          })
          .catch(error => {
            reject(error);
          });
      } else {
        cumulativeOrderValueByOrderStatus("Order Completed").then(
          cumulativeOrderValueObject => {
            points = cumulativeOrderValueObject.cumulativeOrderValue;
            numberOfCompletedOrders =
              cumulativeOrderValueObject.orderDetailsArray.length;
            getLevelDetails(promise, points)
              .then(levelDetails => {
                resolve({
                  level: levelDetails.level,
                  minPoints: levelDetails.minPoints,
                  maxPoints: levelDetails.maxPoints,
                  benefits: levelDetails.benefits,
                  points: levelDetails.points
                });
              })
              .catch(error => {
                reject(error);
              });
            updateProfileSummary(numberOfCompletedOrders, points);
          }
        );
      }
    });
  } else {
    if (currentPoints) {
      points = currentPoints;
      getLevelDetails(promise, points);
    } else {
      const cumulativeOrderValueObject = cumulativeOrderValueByOrderStatus(
        "Order Completed",
        promise
      );
      points = cumulativeOrderValueObject.cumulativeOrderValue;
      numberOfCompletedOrders =
        cumulativeOrderValueObject.orderDetailsArray.length;
      getLevelDetails(promise, points);
      updateProfileSummary(numberOfCompletedOrders, points);
    }
  }
};

/* ===================================== GET LEVEL DETAILS ====================================== */

const getLevelDetails = (promise, points) => {
  if (promise != false) {
    return new Promise((resolve, reject) => {
      // DECLARE REQUIRED VARIABLES
      let level;
      let minPoints;
      let maxPoints;
      let benefits = [];

      // DETERMINE USER'S LEVEL OBJECT
      // Fetch the Level Object Array
      getLevelObjectArray()
        .then(levelObjectArray => {
          // Sort the Level Object Array by Ascending Level
          sortLevelObjectArray(
            levelObjectArray,
            sortLevelObjectArrayByAscendingLevel
          );
          // Using for loop, determine the account level based on the total points
          for (let i = 0; i < levelObjectArray.length; i++) {
            // Minimum and MAximum Points Assoiciated with the Level
            minPoints = Number(levelObjectArray[i].minPoints);
            maxPoints = Number(levelObjectArray[i].maxPoints);
            // Create a list of benefits whenever the points exceed or is within the range of points
            benefits = [...benefits, ...levelObjectArray[i].benefits];
            // If the total points is within the range, execute the code in the if statement
            if (minPoints <= Number(points) && maxPoints > Number(points)) {
              // Assign the value for the 'level' variable
              level = levelObjectArray[i].level;
              // Resolve the promise with the Level Object
              resolve({
                level,
                minPoints,
                maxPoints,
                benefits,
                points
              });
            }
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  } else {
    // DECLARE REQUIRED VARIABLES
    let level;
    let minPoints;
    let maxPoints;
    let benefits = [];

    // Fetch the Level Object Array
    const levelObjectArray = getLevelObjectArray(false).content;
    // Sort the Level Object Array by Ascending Level
    sortLevelObjectArray(
      levelObjectArray,
      sortLevelObjectArrayByAscendingLevel
    );
    // Using for loop, determine the account level based on the total points
    for (let i = 0; i < levelObjectArray.length; i++) {
      // Minimum and MAximum Points Assoiciated with the Level
      minPoints = levelObjectArray[i].minPoints;
      maxPoints = levelObjectArray[i].maxPoints;
      // Create a list of benefits whenever the points exceed or is within the range of points
      benefits = [...benefits, ...levelObjectArray[i].benefits];
      // If the total points is within the range, execute the code in the if statement
      if (minPoints <= points && maxPoints > points) {
        // Assign the value for the 'level' variable
        level = levelObjectArray[i].level;
        // End the function execution by returning the Level Object
        return {
          level,
          minPoints,
          maxPoints,
          benefits,
          points
        };
      }
    }
  }
};

/* ======================================= UPDATE SUMMARY ======================================= */

const updateProfileSummary = (numberOfCompletedOrders, points) => {
  const profile = {
    summary: {
      points,
      numberOfCompletedOrders
    }
  };

  $.ajax({
    type: "POST",
    url: "/profile/update",
    contentType: "application/json",
    data: JSON.stringify({ profile }),
    success: data => {
      console.log(data);
    }
  });
};

/* ================================== SORT LEVEL OBJECT ARRAY =================================== */

const sortLevelObjectArray = (levelObjectArray, compareFunction) => {
  levelObjectArray.sort(compareFunction);
};

/* ========================= SORT LEVEL OBJECT ARRAY BY ASCENDING LEVEL ========================= */

const sortLevelObjectArrayByAscendingLevel = (levelObjectA, levelObjectB) => {
  return Number(levelObjectA.level) - Number(levelObjectB.level);
};

/* ============================================================================================== */
