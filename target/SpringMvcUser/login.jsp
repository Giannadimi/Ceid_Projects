<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
    <%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
        <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
            <title>Login</title>
        </head>
        <body>
            <form id="loginForm" modelAttribute="login" action="loginProcess" method="post">
                <table align="center">
                    <tr>
                        <td>
                            <label path="username">Username: </label>
                        </td>
                        <td>
                            <input path="username" name="username" id="username" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label path="password">Password:</label>
                        </td>
                        <td>
                            <password path="password" name="password" id="password" />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td align="left">
                            <button id="login" name="login">Login</button>
                        </td>
                    </tr>
                    <tr></tr>
                    <tr>
                        <td></td>
                        <td><a href="home.jsp">Home</a>
                        </td>
                    </tr>
                </table>
            </form>
        </body>
        </html>