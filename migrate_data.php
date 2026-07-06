<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

$sqlite = DB::connection('sqlite_phy70');
$mysql = DB::connection('mysql');

$tables = ['phy70_organizations', 'phy70_users', 'phy70_invitations', 'phy70_proposals'];

foreach($tables as $table) {
    if (!$sqlite->getSchemaBuilder()->hasTable($table)) {
        continue;
    }
    $rows = $sqlite->table($table)->get();
    foreach($rows as $row) {
        $data = (array) $row;
        try {
            $mysql->table($table)->updateOrInsert(['id' => $data['id']], $data);
        } catch (\Exception $e) {
            echo "Error migrating $table id {$data['id']}: " . $e->getMessage() . "\n";
        }
    }
    echo "Migrated $table - " . count($rows) . " rows.\n";
}
echo "Done.\n";
