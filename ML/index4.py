import seaborn as sns
import numpy as np
import pydotplus
from sklearn.tree import export_graphviz
import matplotlib.pyplot as plt
from sklearn import tree
import mysql.connector
import pandas as pd
from sklearn.metrics import accuracy_score
from sklearn.metrics import classification_report
from sklearn.model_selection import GridSearchCV, train_test_split
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


class Predctions:
    def __init__(self, id, pred):
        self.id = id
        self.pred = pred
        self.hour = None

    def __repr__(self):
        return str(f"congestion now is: {self.pred},id:{self.id}")


data2 = pd.read_csv('csv_files\Hqueue2.csv')
data = pd.read_csv('csv_files\Hcq1.csv')
# X = data.drop(columns=["avg_queue_time"])
# y = data['avg_queue_time']


# X_train, X_test, y_train, y_test = train_test_split(
#     X, y, test_size=0.3, random_state=42)
X_train = data.drop(columns=["avg_queue_time"])
y_train = data['avg_queue_time']


X_test = data2.drop(columns=["avg_queue_time"])
y_test = data2['avg_queue_time']

# param_grid = {
#     'n_estimators': [50, 100, 150],
#     'learning_rate': [0.05, 0.1, 0.2],
#     'max_depth': [3, 4, 5],
#     'random_state': [0, 1, 2, 42]
# }


model = GradientBoostingRegressor()

# Use GridSearchCV to find the best hyperparameters
# grid_search = GridSearchCV(model, param_grid, cv=5, n_jobs=-1)
# grid_search.fit(X_train, y_train)

# # Print the best hyperparameters and best score
# print("Best parameters:", grid_search.best_params_)
# print("Best score:", grid_search.best_score_)

# # Define the best hyperparameters
best_params = {'learning_rate': 0.05, 'max_depth': 3,
               'n_estimators': 50, 'random_state': 42}

# # Create a new GradientBoostingRegressor with the best hyperparameters
regressor = GradientBoostingRegressor(**best_params)

# # Train the model on the entire training dataset
regressor.fit(X_train, y_train)

# # Make predictions on the testing dataset
y_pred = regressor.predict(X_test)

# Calculate the evaluation metrics
mse = mean_squared_error(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

# Print the evaluation metrics
print("Mean squared error: ", mse)
print("Mean absolute error: ", mae)
print("R-squared: ", r2)

# Create a DataFrame with the actual and predicted values
# test_score = np.zeros((best_params["n_estimators"],), dtype=np.float64)
# for i, y_pred in enumerate(regressor.staged_predict(X_test)):
#     test_score[i] = mean_squared_error(y_test, y_pred)
# fig = plt.figure(figsize=(6, 6))
# plt.subplot(1, 1, 1)
# plt.title("Deviance")
# plt.plot(
#     np.arange(best_params["n_estimators"]) + 1,
#     regressor.train_score_,
#     "b-",
#     label="Training Set Deviance",
# )
# plt.plot(
#     np.arange(best_params["n_estimators"]) + 1, test_score, "r-", label="Test Set Deviance"
# )
# plt.legend(loc="upper right")
# plt.xlabel("Boosting Iterations")
# plt.ylabel("Deviance")
# fig.tight_layout()
# plt.show()


count = 0
count1 = 0
count2 = 0
count3 = 0
count3 = 0
count4 = 0
therhold = 5
therhold1 = 1
therhold2 = 2
therhold3 = 3
therhold4 = 4
newVal = []
countNot = 0
for i in range(len(y_pred)):
    if (abs(y_pred[i]-y_test.iloc[i]) <= therhold1):
        count1 += 1
    if (abs(y_pred[i]-y_test.iloc[i]) <= therhold2):
        count2 += 1
    if (abs(y_pred[i]-y_test.iloc[i]) <= therhold3):
        count3 += 1
    if (abs(y_pred[i]-y_test.iloc[i]) <= therhold4):
        count4 += 1
    if (abs(y_pred[i]-y_test.iloc[i]) <= therhold):
        count += 1
    else:
        print("pred:", y_pred[i], "true:", y_test.iloc[i])
        countNot += abs(y_pred[i]-y_test.iloc[i])
    val = Predctions(y_test.index.values[i], y_pred[i])
    # print(f"val:{val},i:{i}")
    newVal.append(val)

print("5 minutes:", count/(len(y_pred)))
print("1 minutes:", count1/(len(y_pred)))
print("2 minutes:", count2/(len(y_pred)))
print("3 minutes:", count3/(len(y_pred)))
print("4 minutes:", count4/(len(y_pred)))
print(countNot/((len(y_pred))-count))
# print(max(y_pred))
# print(min(y_pred))
# print(max(y_test))
# print(min(y_test))
# df = pd.read_csv('csv_files\HourlyAvg92.csv')

# # Update the 'congestion' column based on conditions
# df['congestion'] = df['congestion_level'].apply(
#     lambda x: 0 if x < 30 else (1 if 30 <= x <= 50 else 2))

# # Save the updated DataFrame back to the CSV file
# df.to_csv('csv_files\HourlyAvg921.csv', index=False)

# Establish a connection to MySQL
# conn = mysql.connector.connect(
#     user='root',
#     password='Akuokfuko123+',
#     host='localhost',
#     database='supermarket'
# )

# # # # # Create a cursor object to execute SQL queries
# cursor = conn.cursor()

# cursor.execute('''CREATE TABLE PredictionsQueue (
#                    week INT,
#                    day INT,
#                    hour INT,
#                    predictions float
#                  )''')
# # Iterate over the data and upload to MySQL
# for i in range(len(data2)):
#     week = data2.loc[newVal[i].id]['week']
#     day = data2.loc[newVal[i].id]['day']
#     hour = data2.loc[newVal[i].id]['hour']
#     prediction = newVal[i].pred

#     # Define the SQL query to insert the data into the table
#     query = "INSERT INTO PredictionsQueue(week, day, hour, predictions) VALUES (%s, %s, %s, %s)"

#     # Execute the query with the data values
#     cursor.execute(query, (week, day, hour, prediction))

#     conn.commit()

# # Update the congestion column based on the avg_duration
# cursor.execute('''ALTER TABLE PredictionsQueue
#                  ADD COLUMN congestion VARCHAR(255)''')
# cursor.execute('''UPDATE PredictionsQueue
#                  SET congestion =  (CASE
#     WHEN predictions < 10 THEN 'free'
#                                     WHEN predictions BETWEEN 10 AND 25 THEN 'Medium congestion'
#                                     ELSE 'heavy congestion'
#   END)''')

# # Commit the changes to the database

# conn.commit()
# # # Close the cursor and connection


# query1 = """SELECT congestion from Predictions93 """
# y_afternoon_pred = pd.read_sql(query1, conn)

# y_afternoon_true = pd.read_csv('csv_files\HourlyAvg931.csv')['congestion']

# accuracy = accuracy_score(y_afternoon_true, y_afternoon_pred)
# print("Accuracy:", accuracy)
# print(classification_report(y_afternoon_true, y_afternoon_pred))
# cursor.close()
# conn.close()
