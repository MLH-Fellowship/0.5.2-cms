import typer
app = typer.Typer()
@app.command()

def logIn():
    """"
    this authenticates the user
    """
    user = typer.prompt("i need to verify your identity, please enter the email associated with your account")
    password = typer.prompt("and password")
    typer.echo(f"Welcome {user}!select the command you want to do by typing python main.py command name.")
    typer.echo("To see the available commands type python main.py --help")

@app.command()
def createAccount():
    """"
    this allows user to create new account
    """
    check = typer.confirm("Can you verify for me that you don't have a connections account?")
    if check:
        typer.echo("launching site so you can create your account....")
        typer.launch("http://127.0.0.1:5000/")

@app.command()
def add(name:str, notes: str):
    """"
    allows user to add a connection's name, and notes
    """
    check = confirmUser()
    if not check:
        raise typer.Abort()
    typer.run(logIn)
    typer.echo(f"adding {name} as a connection now- and your notes on them too!")

def confirmUser():
    checked = True
    check = typer.confirm("I need to verify who you are first, do you have a connection account?")
    if not check:
        typer.echo("type main.py createAccount to start that process")
        checked = False
        raise typer.Abort()
    typer.echo("alright, let's get you logged in!")
    return checked

@app.command()
def add(name:str):
    """"
    allows user to add only name of connection
    """
    check = confirmUser()
    if check:
        typer.echo(f"adding {name} as a connection now")
    raise typer.Abort()

@app.command()
def view(connectionName:str):
    """"
    allows user to view a specific connection by name only
    """
    check = confirmUser()
    if check:
        typer.echo(f"taking you to view {connectionName}'s details now")
    raise typer.Abort()

@app.command()
def search(contactInfo:str):
    """"
    allows user to search for a connection's email/contact info provided
    """
    check = confirmUser()
    if check:
        typer.echo(f"searching for connection with {contactInfo}'s details now")
    raise typer.Abort()

@app.command()
def update(name:str):
    """"
    allows user to edit a connection's info
        """
    info = typer.prompt("What would you like to update?")
    infoTobeUpdated = typer.prompt(f"Enter the updated {info} for {name}now")
    save = typer.confirm(f"can I save updated{name}'s {info} with the following: {infoTobeUpdated}")
    if not save:
        typer.echo("not updating")
        raise typer.Abort()
    typer.echo("saved!")

if __name__ == '__main__':
   app()

