import React, { Fragment } from 'react';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import ScenePortal from '../@core/ScenePortal';
import Sprite from '../@core/Sprite';
import TileMap, { TileMapResolver } from '../@core/TileMap';
import { mapDataString } from '../@core/utils/mapUtils';
import spriteData from '../spriteData';
import CoffeeMachine from '../entities/CoffeeMachine';
import PizzaPickup from '../entities/PizzaPickup';
import Plant from '../entities/Plant';
import Player from '../entities/Player';
import Workstation from '../entities/Workstation';

const mapData = mapDataString(`
# # # # # # # #
# T T · · · · #
· · o o o · · #
# · o o o · · #
# · o · · · · #
# · o · · · C #
# C · · · T T #
# # # # # # # #
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
        case 'o':
            return (
                <Fragment key={key}>
                    {floor}
                    <PizzaPickup {...position} />
                </Fragment>
            );
        case '#':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.objects} state="wall" />
                </GameObject>
            );
        case 'W':
            return (
                <Fragment key={key}>
                    {floor}
                    <Workstation {...position} />
                </Fragment>
            );
        case 'C':
            return (
                <Fragment key={key}>
                    {floor}
                    <CoffeeMachine {...position} />
                </Fragment>
            );
        case 'T':
            return (
                <Fragment key={key}>
                    {floor}
                    <Plant {...position} />
                </Fragment>
            );
        default:
            return null;
    }
};

export default function OtherScene() {
    const renderConnectedContainer = () => (
        <div>
            <form>
                <button type="submit" className="cta-button submit-gif-button">
                    Submit
                </button>
            </form>
            <GameObject name="map">
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>
            <GameObject x={0} y={5}>
                <Collider />
                <Interactable />
                <ScenePortal name="start" enterDirection={[1, 0]} target="office/exit" />
            </GameObject>
            <Player x={2} y={5} />
        </div>
    );
    return (
        <>
            {/* <GameObject name="map">
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>
            <GameObject x={0} y={5}>
                <Collider />
                <Interactable />
                <ScenePortal name="start" enterDirection={[1, 0]} target="office/exit" />
            </GameObject>
            <Player x={2} y={5} /> */}
            {renderConnectedContainer()}
        </>
    );
}
