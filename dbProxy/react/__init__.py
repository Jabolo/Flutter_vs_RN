import logging
import mysql.connector
import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    try:
        req_body = req.get_json()

        device = req_body.get('device')
        results = req_body.get('results')

        mydb = mysql.connector.connect(
        host="flutter-vs-rn.mysql.database.azure.com",
        user="client",
        password="client",
        database="flutter_vs_rn"
        )

        mycursor = mydb.cursor()

        sql = "INSERT INTO rn (device, results) VALUES (%s, %s)"
        val = (device, results)
        mycursor.execute(sql, val)

        mydb.commit()

        print(mycursor.rowcount, "record inserted.")


        return func.HttpResponse("OK")
    except:
        return func.HttpResponse(
             "Error",
             status_code=500
        )
