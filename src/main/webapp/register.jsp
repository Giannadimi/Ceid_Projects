<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
    <%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
        <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
            <title>Registration</title>
        </head>
        <body>
            <form id="regForm" modelAttribute="user" action="registerProcess" method="post">
                <table align="center">
                    <tr>
                        <td>
                            <label path="username">Username</label>
                        </td>
                        <td>
                            <input path="username" name="username" id="username" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label path="password">Password</label>
                        </td>
                        <td>
                            <password path="password" name="password" id="password" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label path="firstname">FirstName</label>
                        </td>
                        <td>
                            <input path="firstname" name="firstname" id="firstname" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label path="lastname">LastName</label>
                        </td>
                        <td>
                            <input path="lastname" name="lastname" id="lastname" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label path="email">Email</label>
                        </td>
                        <td>
                            <input path="email" name="email" id="email" />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button id="register" name="register">Sign Up</button>
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