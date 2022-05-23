import React, { Fragment } from 'react';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import ScenePortal from '../@core/ScenePortal';
import Sprite from '../@core/Sprite';
import TileMap, { TileMapResolver } from '../@core/TileMap';
import { mapDataString } from '../@core/utils/mapUtils';
import Player from '../entities/Player';
import spriteData from '../spriteData';
import Plant from '../entities/Plant';
import CoffeeMachine from '../entities/CoffeeMachine';
import Workstation from '../entities/Workstation';
import Shelf from '../entities/Shelf';

const mapData = mapDataString(`

# # # # # # # # # # #
# S · · · · · · · C #
# S · # W · · · · # #
# S · # W · · · · · #
# S · # W · W # · W #
# S · · · · · # · · #
# S S S S S S S T · ·
# # # # # # # # # # #
`);

const resolveMapTile: TileMapResolver = (type, x, y) => {
    const key = `${x}-${y}`;
    const position = { x, y };

    const floor = (
        <GameObject key={key} {...position} layer="ground">
            <Sprite {...spriteData.objects} state="floor" />
        </GameObject>
    );

    switch (type) {
        case '·':
            return floor;
        case '#':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.objects} state="wall" />
                </GameObject>
            );
        case 'T':
            return (
                <Fragment key={key}>
                    {floor}
                    <Plant {...position} />
                </Fragment>
            );
        case 'C':
            return (
                <Fragment key={key}>
                    {floor}
                    <CoffeeMachine {...position} />
                </Fragment>
            );
        case 'W':
            return (
                <Fragment key={key}>
                    {floor}
                    <Workstation {...position} />
                </Fragment>
            );
        case 'S':
            return (
                <Fragment key={key}>
                    {floor}
                    <Shelf {...position} />
                </Fragment>
            );
        default:
            return null;
    }
};

export default function LibraryScene() {
    return (
        <>
            <GameObject name="map">
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>
            <GameObject x={10} y={1}>
                <Collider />
                <Interactable />
                <ScenePortal name="start" enterDirection={[1, 0]} target="office/exit" />
            </GameObject>
            <Player x={10} y={1} />
        </>
    );
}