from flask import Flask,redirect,render_template,request
from flask_sqlalchemy import SQLAlchemy
from model import db, Employees
# Create database extension

app = Flask(__name__)
# Add database
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///crud.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Initialize database
db.init_app(app)
with app.app_context():
    db.create_all()

@app.route('/', methods = ['GET', 'POST'])
def index():
    if request.method=="POST":
        employee = Employees(
        name =request.form.get('name'),
        email=request.form.get("email")
            )
        db.session.add(employee)
        db.session.commit()
        return redirect('/create')
    return render_template('index.html')

@app.route('/create', methods = ['GET', 'POST'])
def create():
    employee=Employees.query.all()
    if request.method=="POST":
        action = request.form.get('action')
        if action== 'add':
            employee = Employees(
            name =request.form.get('name'),
            email=request.form.get("email")
            )
            db.session.add(employee)
            db.session.commit()
        elif action=='delete':
            id =request.form.get('id')
            employee=Employees.query.get(id)
            print(employee)
            db.session.delete(employee)
            db.session.commit()
        elif action =='update' :
            id =request.form.get('id')
            employee=Employees.query.get(id)
            db.session.delete(employee)
            db.session.commit()
            employee = Employees(
            name =request.form.get('name'),
            email=request.form.get("email")
            )
            db.session.add(employee)
            db.session.commit()
        employee = Employees.query.all()    
        return render_template('create.html',employees=employee)
    else :
        return redirect('/')














if __name__ == ('__main__'):
    app.run(debug=True)