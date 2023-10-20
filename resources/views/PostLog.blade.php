<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Posts Logs</title>
    <style>
        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        td,
        th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }

        tr:nth-child(even) {
            background-color: #dddddd;
        }
    </style>
</head>
{{-- pagina, data da consulta --}}

<body>
    <h1>POSTS LOG</h1>
    <div>
        <table>
            <thead>
                <th>Id</th>
                <th>User Name</th>
                <th>Subject</th>
                <th>Created At</th>
            </thead>
            <tbody>
                @foreach ($posts as $post)
                    <tr>
                        <td>{{ $post->id }}</td>
                        <td>{{ $post->owner->name }}</td>
                        <td>{{ $post->subject }}</td>
                        <td>{{ date("d-m-Y", strtotime($post->created_at)) }}</td>
                    </tr>
                @endforeach
            </tbody>
    </div>
    <footer class="flex justify-end">
        <p class="mr-3">{{ date('d-m-Y') }}</p>
    </footer>
    <script type="text/php">
        if (isset($pdf)) {
            $text = "page {PAGE_NUM} / {PAGE_COUNT}";
            $size = 10;
            $font = $fontMetrics->getFont("Verdana");
            $width = $fontMetrics->get_text_width($text, $font, $size) / 2;
            $x = ($pdf->get_width() - $width) / 2;
            $y = $pdf->get_height() - 35;
            $pdf->page_text($x, $y, $text, $font, $size);
        }
    </script>
</body>

</html>
