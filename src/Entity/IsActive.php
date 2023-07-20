<?php

/**
 * src/Entity/IsActive.php
 *
 * @license https://opensource.org/licenses/MIT MIT License
 * @link    https://www.etsisi.upm.es/ ETS de Ingeniería de Sistemas Informáticos
 */

namespace TDW\ACiencia\Entity;

/**
 * @Enum({ "active", "inactive" })
 */
enum IsActive: string {
    // scope names (roles)
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';

    public const ALL_VALUES = [ 'active', 'inactive' ];
}
