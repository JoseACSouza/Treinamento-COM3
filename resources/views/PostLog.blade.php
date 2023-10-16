<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Posts Logs</title>
</head>
<body>
    <h1>POSTS LOG</h1>
<table>
    <thead>
        <th>Id</th>
        <th>User_id</th>
        <th>Subject</th>
        <th>Created At</th>
    </thead>
    <tbody>
        @foreach ( $posts as $post )
        <tr>
            <td>{{$post->id}}</td>
            <td>{{$post->user_id}}</td>
            <td>{{$post->subject}}</td>
            <td>{{$post->created_at}}</td>
        </tr>
        @endforeach
    </tbody>

</body>
</html>
